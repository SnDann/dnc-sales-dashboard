namespace Test.Domain.Entidades;

[TestClass]
public class AdministradorServicoTest
{
    private DbContexto CriarContextoDeTeste()
    { 
        var path = Path.GetDirectoryName(Assembly.GetExecutimgAssembly().Location);
    

       // Configurar oConfigurador
          var builder = new ConfigurationBuilder()
          .SetBasePath(path ?? Directory.GetCurrentDirectory())
          .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
          .AddEnvironmentVariables();
          
          var configuration = builder.Build();

        return new DbContexto(configuration);
}

    [TestMethod]
    public void TestandoBuscarPorId()
    {
        // Arrange
        var context = CriarContextoDeTeste();
        contexto.Database.ExecuteSqlRaw("Trincate table Administradores");


        var adm = new Administrador();
        adm.Id = 1;
        adm.Email = "teste@teste.com";
        adm.Senha = "teste";
        adm.Perfil = "Adm";


        
        var administradorServico = new AdministradorServico(context);


        // Act
        administradorServico.Incluir(adm);
         var admDoBanco = administradorServico.BuscarporId(adm.Id);
        
        // Assert
        Assert.AreEqual(1, admDoBanco?.Id);
    
    }
}