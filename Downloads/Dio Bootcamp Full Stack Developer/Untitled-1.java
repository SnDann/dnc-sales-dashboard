*// Java Desafio Problema*

import java,util.Scanner;

public class Dsafio {

    public static void main(String[] args) {
        // Lê os valores de Entrada:
        Scanner leitordeEntradas = new Scanner(System.in);
        float valorSalario = leitordeEntradas.nextFloat();
        float valorBeneficios = leitordeEntradas.nextFloat();

        float valorImposto = 0;
        if (valorSalario >= 0 && valorSalario <= 1100) {
            // Atribuiu a aliquota de 5% mediante o salario:
            valorImposto = (valorSalario * 0.05f) + valorBeneficios
        }
        else if (valorSalario >= 1100.01 && valorSalario <= 2500.00) {
            valorImposto = 0.10F = valorSalario;
        } else {
            valorImposto = 0.15F * valorSalario;
        }
    
        // TODO Criar as demais condições para as aliquotas de 10.00% e 15.00%

        // Calcular e imprimir a saida ( com 2 casas decimais)
        float saída = valorSalario - valorImposto + valorBeneficios;
        System.out.println(String.format("%.2f", saída));
        
    }
}