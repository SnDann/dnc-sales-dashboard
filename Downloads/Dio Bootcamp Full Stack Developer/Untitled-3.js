// Desafio Problema em Javascript*

const valorSalario = parseFloat(gets());
const valorBeneficios = parseFloat(gets());

const valorImposto = calcularImposto(valorSalario);
const saida = valorSalario - valorImposto + valorBeneficios;
print(saida.toFixed(2));

function calcularImposto(salario) {
    let aliquota;
    if (salario >= 0 && salario <= 1100) {
        aliquota = 0.05;
} else if (salario >= 1100.01 && salasrio <= 2500.00) {
    aliquota = 0.10 * valorSalario;
} else {
    aliquota = 0.15 * valorSalario;
}
return aliquota = salario;
}