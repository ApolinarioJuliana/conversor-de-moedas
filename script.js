const campoValor = document.getElementById('valoresReais')
const seletorOrigem = document.getElementById('moedaOrigem')
const seletorDestino = document.getElementById('moedaDestino')
const botao = document.getElementById('botaoconverter')
const campoResultado = document.getElementById('resultado')

async function converterMoeda() 
{
    const valorDigitado = campoValor.value
    const valorOrigem = seletorOrigem.value
    const valorDestino = seletorDestino.value
    
    if (!valorDigitado || valorDigitado <= 0){
        campoResultado.innerText = "Por favor, insira um valor válido."
        return
    }
    
 
    if (valorOrigem === valorDestino){
        campoResultado.innerText = `${valorDigitado} ${valorDestino} é igual a ${valorDigitado} ${valorDestino}`
        return
    }
    
    campoResultado.innerText = 'Buscando cotação atualizada..'

    try {
        
      const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${valorOrigem}-${valorDestino}`)
        const dados = await resposta.json()
        const chaveMoeda = `${valorOrigem}${valorDestino}`
        const precoMoeda = dados[chaveMoeda].ask




        const valorConvertido = (valorDigitado * precoMoeda)
        const formatador = new Intl.NumberFormat('pt-BR',{
                style:'currency',
                currency: valorDestino
        });   
                            
        const resultadoFormatado = formatador.format(valorConvertido)
                

           campoResultado.innerText = `${valorDigitado} ${valorOrigem} equivale a ${resultadoFormatado}`
                          

     } catch (erro) {
        campoResultado.innerText = "Erro, tente novamente"
        console.error(erro)
     }
}
botao.addEventListener('click', converterMoeda)
