using Api.Test.Helpers;
using Test.Domain.Entidades;

namespace Test.Request;

[TestClass]
public class AdministradorRequestTest
{
    [ClassInitialize]
    public static voids ClassInit(TestContext testContext)
    {
        Setup.ClassInit(testContext);
    }

    [Cleanup]
     public static void ClassCleanup()
     {
        Setup.CLassCleanup();
     }
    [TestMethod]
    public async void TestarGetPropriedades()
    {
        // Arrange
       var loginDTO = new LoginDTO{
        Email = "adm@teste.com",
        Senha = "123456"
       };

       var content = new StringContent(JsonSerializer.Serialize(LoginDTO),Encoding.UTF8, "Apllication/json");
        // Act
       var response = await Setup.client.PostAsync("/administradores/login", content);
        // Assert
       AdministradorServicoTest.AreEqual(HttpStatusCode.Ok, respopnse.StatusCode);

       var result = await response.content.ReadAsStringAsync();
       var admLogado = JsonSerializer.Deserialize<AdministradorLogado>(result, new JsonSerializerOptions
       {
        PropertyNameCaseInsensitive = true
       });
    
    Assert.IsNotNull(admLogado?.Email ?? "");
    Assert.IsNotNull(admLogado?.Perfil ?? "");
    Assert.IsNotNull(admLogado.Token ?? "");
    }
}