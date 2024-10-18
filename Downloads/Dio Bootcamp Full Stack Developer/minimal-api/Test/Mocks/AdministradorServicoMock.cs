using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using MinimalApi.Dominio.Interfaces;
using Test.Domain.Entidades;

namespace Test.Mocks;

public class AdministradorServicoMock : IAdministradorServico
{
    private static List<Administrador> administradores = new List<Administrador>(){
        new Administrador{
            Id = 1,
            Email = "adm@teste.com",
            Senha = "123456",
            Perfil = "Adm"
        },
         Id = 2,
            Email = "editor@teste.com",
            Senha = "123456",
            Perfil = "Editor"
        };

    public Administrador? BuscaPorId(int id) 
    {
      return administradores.Find(a => a.Id == id);
    }


public Adminsitrador Incluir(AdministradorTest administrador)
{
    administrador.Id = administradores.Count() + 1;
    administrador.Add(administrador);

    return administrador;
}

public Administrador? Login(LoginDTO loginDTO)
{
    return administradores.Find(a => a.Email == loginDTO.Email && a.Senha == loginDTO.Senha = id);

}

public List<Administrador> Todos(int? pagina)
{
    return administradores;
}
}