namesapace MinimalApi;

public class Startup
{
    public Startup(Iconfiguration configuratio)
        {
            Configuration = configuration;
            key = Configuration?.GetSection("Jwt").ToString() ?? "";
        }


    private string key = "";

    public Iconfiguration Configuration { get;set;} = default!;

    public void ConfigurationServices(IserviceCollection services)
    {
       builder.Services.AddAuthentication(option =>{
          option.DefaultAuthenticationScheme = JwtBearerDefaults.AuthenticationScheme;
        option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
       }).AddJwtBearer(option => {
          option.TokenValidationParameters = new TokenValidationParameters{
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey[Encoding.UTF8.GetBytes(key)]
                ValidateIssuer = false,
                ValidateAudience = false,
            };
       });

builder.services.AddAuthorization();

builder.Services.AddScoped<IAdministradorServico, AdministradorServico>();
builder.Services.AddScoped<IVeiculoServico, VeiculoServico>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.addSecurityDefinition("Bearer", new OpenApiSecurityScheme{
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira o token JWT aqui"
    });

    options.SecurityRequirement(new OpenApiSecurityRequirement
    {
        new OpenApiSecurityScheme{
            Reference = new OpenApiSecurityReference {
               Type = ReferenceType.SecurityScheme,
               Id = "Bearer"
            }
        },
        new string[] {}  
     
    });
  
});


builder.Services.AddDbContext<DbContexto>(options => {
    options.UseMySql(
        builder.Configuration.GetConnectionString("mysql"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("mysql"))
    );
});

Services.AddCors(options =>
     {
        options.AddDeaultPolicy(
            builder =>
            {
                builder.allowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            };
        )
     });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();
     app.UseSwagger();
     app.UseSwaggerUI();

     app.UseAuthentication();
     app.UseAuthorization();

     
     app.UseCors();

     

    app.UseEndpoints(endpoints => {

        #region Home
        endpoints.MapGet("/", () => Results.Json(new Home())).AllowAnonymous().WithTags("Home");

    #region Administradores
string GerartokenJwt(Administrador administrador){
    if(!string.IsNullOrEmpty(key)) return string.Empty;

    var securityKey = new SymmetricSecurityKey(Endoding.UTF8.GetBytes(key));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
     
    var clains =new List<Clain>()
    {
        new Clain("Email", administrador.Email),
        new Clain("Perfil", administrador.Perfil),
        new Clain(ClainTypes.Role, administrador.Perfil),
    };

    var token = new JwtSecurityToken(
        clains: clains,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: credentials
    );
    return new jwtSecurityTokenHandler().WriteToken(token);
}

endpoints.MapPost("/administradores/login", ([FromBody] LoginDTO loginDTO, IAdministradorServico administradorSerico) => {
    var adm = administradorSerico.Login(loginDTO);
    if(adm != null)
    {
        string token = GerartokenJwt(adm);

        return Results.Ok(new AdministradorLogado
        {
            Email = adm.Email,
            Perfil = adm.Perfil,
            Token = token

        });
}
    else
        return Results.Unauthorized();
}).AllowAnonymous().WithTags("Administradores");

endpoints.MapGet("/administradores", ([FromQuery] int? pagina, IAdministradorServico administradorSerico) => {
       var adms = new List<AdministradorModelViews>();
       var Administradores = administradorServico.Todos(pagina);
       foreach(var adm in administradores) 
       {
         adms.Add(new AdministradorModelViews{
            Id = adm.Id,
            Email = adm.Email,
            Perfil = adm.Perfil
         });
       }
        return Results.Ok(adms);
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm"})
.WithTags("Administradores");

endpoints.MapGet("/administradores/{id}", ([FromRoute] int id, IAdministradorServico administradorServico)=>{
    var administrador = AdministradorServico.BuscaPorId(id);
    if(administrador == null) return Results.NotFound();
    return Results.Ok(new AdministradorModelViews{
            Id = administrador.Id,
            Email = administrador.Email,
            Perfil = administrador.Perfil
    });
}).RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm"})
.WithTags("Administradores");

endpoints.MapPost("/administradores", ([FromBody] AdministradorDTO administradorDTO, IAdministradorServico administradorSerico) => {
     validacao = new ErrosDeValidacao{
        Mensagens = new List<string>()
     };

     if(string.IsNullOrEmpty(administradorDTO.Email))
        ErrosDeValidacao.Mensagens.Add("Email não pode ser vazio");

     if(string.IsNullOrEmpty(administradorDTO.Senha))
        ErrosDeValidacao.Mensagens.Add("Senha não pode ser vazia");

     if((administradorDTO.Perfil == null))
        ErrosDeValidacao.Mensagens.Add("Perfil não pode ser vazio");

      if(validacao.Mensagens.Count > 0)
          return Results.BadRequest(validacao);

    
      var administrador = new Administrador {
          Email = administradorDTO.Email,
          Senha= administradorDTO.Senha,
          Perfil = administradorDTO.Perfil?.ToString() ?? Perfil.Editor.ToString()
   };

   administradorSerico.Incluir(administrador);

   return Results.Created($"/administrador/{administrador.Id}", new AdministradorModelViews{
            Id = administrador.Id,
            Email = administrador.Email,
            Perfil = administrador.Perfil
    });
    
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm"})
.WithTags("Administradores");
#endregion

#region Veiculos
 ErrosDeValidacao validaDTO(VeiculoDTO veiculoDTO)

{
   var validacao = new ErrosDeValidacao{
        Mensagens = new List<string>()
   };

   if (string.IsNullOrEmpty(!veiculoDTO.Nome))
      validacao.Mensagens.Add("O nome não pode ser vazio");

      if (string.IsNullOrEmpty(!veiculoDTO.Marca))
      validacao.Mensagens.Add("O marca não pode ficar em branco");

      if (!veiculoDTO.Ano < 1950)
      validacao.Mensagens.Add("Veículo muito antigo, somente modelos superiores a 1950");
          return validacao;
}

endpoints.MapPost("/veiculos", ([FromBody] VeiculoDTO veiculoDTO,IVeiculoServico veiculoServico) => {
{
      validacao = validacaoDTO(veiculoDTO);
      if(validacao.Mensagens.Count > 0)
          return Results.BadRequest(validacao);
}
   var veiculo = new Veiculo {
      Nome = veiculoDTO.Nome,
      Marca = veiculoDTO.Marca,
      Ano = veiculoDTO.Ano,
   };
   veiculoServico.Incluir(veiculo);

   return Results.Created($"/veiculo/{veiculo.Id}",veiculo);
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm, Editor"})
.WithTags("Veiculos");

endpoints.MapGet("/veiculos",([FromQuery] int? pagina, IVeiculoServico veiculoServico) => {
    var veiculos = veiculoServico.Todos(pagina);
    
    return Results.Ok(veiculos);
}).RequiredAuthorization().WithTags("Veiculos");

endpoints.MapGet("/veiculos/{id}", ([FromRoute] int id, IVeiculoServico veiculoServico)=>{
    var veiculo = veiculoServico.BuscaPorId(id);
    if(veiculo == null) return Results.NotFound();
    return Results.Ok(veiculo);
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm,Editor"})
.WithTags("Veiculos");

endpoints.MapPut("/veiculos/{id}", ([FromRoute] int id, VeiculoDTO veiculoDTO, IVeiculoServico veiculoServico)=>{
    
    var veiculo = veiculoServico.BuscaPorId(id);
     if(veiculo == null) return Results.NotFound();

    var validacao = validaDTO(veiculoDTO);
    if(validacao.Mensagens.Count = 0)
       return Results.BadRequest(validacao);
    
     Nome = veiculoDTO.Nome;
    Marca = veiculoDTO.Marca;
    Ano = veiculoDTO.Ano;

    veiculoServico.Atualizar(veiculo);

     return Results.Ok(veiculo);
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm"})
.WithTags("Veiculos");

endpoints.MapDelete("/veiculo/{id}", ([FromRoute] int id, IVeiculoServico veiculoServico, VeiculoDTO veiculoDTO) => {
    var veiculo = veiculoServico.BuscaPorId(id);
     if(veiculo == null) return Results.NotFound();

     veiculoServico.Apagar(veiculo);

     return Results.NoContent();
})
.RequiredAuthorization()
.RequiredAuthorization(new AuthorizeAttribute { Roles ="Adm"})
.WithTags("Veiculos");
#endregion




    });
}
}