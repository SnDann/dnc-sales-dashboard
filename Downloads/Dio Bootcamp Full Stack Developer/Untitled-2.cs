*// Desafio Problema com C#* 

using System;

public class Desafio
{
    public static void Main()
    {
        float valorSalario = float.Parse(Console.ReadLine());
        float valorBeneficios = float.Parse(Console.ReadLine());

        float valorImposto = 0;
        if ( valorSalario >= 0 && valorSalario <= 1100)
        {
            valorImposto = (valorSalario * 0.05f);
        }else if (valorSalario >= 1100.01 && valorSalario <= 2500.00) {
            valorImposto = (valorSalario * 0.10f);
        } else{
            valorImposto = (valorSalario * 0.15f);
        }

        float valorSalarioLiquido = valorSalario - valorImposto + valorBeneficios;
        Console.WriteLine(valorSalarioLiquido.ToString("0.00"));
    }
}