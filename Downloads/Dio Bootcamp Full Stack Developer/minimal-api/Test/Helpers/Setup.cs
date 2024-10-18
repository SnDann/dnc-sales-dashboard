using Test.Domain.Entidades;
using Test.Mocks;

namespace Api.Test.Helpers;

public class Setup
{
    public const string PORT = "5001";
    public static TestContext testContent = default!;
    public static WebApplicationFactory<Startup>http = default!;
    public static HttpClient client = default!; 

    public static void ClassInit(TestContex testContext)
    {
        Setup.TextContext = testContext;
        Setup.http = new WebApplicationFactory<Startup>();

        Setup.jttp = Setup.http.WithWebHostBuilder(builder =>
        {
            builder.UseSetting("https_port", Setup.PORT).USeEnvironment("Testing");

            builder.ConfigureServices(AdministradorServicoTest =>
             {
                services.AddScoped<IAdministradoServico, AdministradorServicoMock>();
                
            });
        });

        Setup.client =Setup.http.CreateClient();
    }

    public static void CLassCleanup()
    {
        Setup.http.Dispose();

    }
}


        //
        // == Caso queira deixar o teste com conexão diferente ==
      //  var conexao ="Server=localhost;Database=desafio21dias_dotnet7_test;Uis=root;Pwd=123456;
      //  services.AddDbContext>(options =>
       // {

      //  }
        //*




    
    
