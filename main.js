const conta = document.getElementById('conta')
const resultado = document.getElementById('resultado')
const historico = document.getElementById('historico')
const toggle = document.getElementById('toggleHistorico')
const painel = document.getElementById('painelHistorico')
const botoes = document.querySelectorAll('.btn')

let expressao = ''

function atualizarTela() {
  const contaVisual = expressao
    .replaceAll('*', '×')
    .replaceAll('/', '÷')

  conta.textContent = contaVisual || '0'

  if (expressao === '') {
    resultado.textContent = '0'
    return
  }

  const ultimoCaractere = expressao[expressao.length - 1]

  if ('+-*/%'.includes(ultimoCaractere)) {
    try {
      const parcial = expressao.slice(0, -1)
      resultado.textContent = parcial ? eval(parcial) : '0'
    } catch {
      resultado.textContent = 'ERRO'
    }
    return
  }

  try {
    resultado.textContent = eval(expressao)
  } catch {
    resultado.textContent = 'ERRO'
  }
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.textContent.trim()

    if (botao.classList.contains('numero')) {
      expressao += valor
      atualizarTela()
      return
    }

    if (botao.classList.contains('operador')) {
      if (expressao === '') return

      const ultimoCaractere = expressao[expressao.length - 1]

      if ('+-*/%'.includes(ultimoCaractere)) return

      if (valor === '×') {
        expressao += '*'
      } else if (valor === '÷') {
        expressao += '/'
      } else {
        expressao += valor
      }

      atualizarTela()
      return
    }

    if (botao.classList.contains('limpar')) {
      expressao = ''
      atualizarTela()
      return
    }

    if (botao.classList.contains('apagar')) {
      expressao = expressao.slice(0, -1)
      atualizarTela()
      return
    }

    if (valor === '=') {
      if (expressao === '') return

      const ultimoCaractere = expressao[expressao.length - 1]
      if ('+-*/%'.includes(ultimoCaractere)) return

      try {
        const contaOriginal = expressao
        const resultadoFinal = eval(expressao).toString()

        const contaVisual = contaOriginal
          .replaceAll('*', '×')
          .replaceAll('/', '÷')

        historico.innerHTML += `<p data-expressao="${contaOriginal}">${contaVisual} = ${resultadoFinal}</p>`

        expressao = resultadoFinal
        atualizarTela()
      } catch {
        resultado.textContent = 'ERRO'
        expressao = ''
        conta.textContent = '0'
      }

      return
    }
  })
})

historico.addEventListener('click', e => {
  const item = e.target.closest('p')
  if (!item) return

  const exp = item.getAttribute('data-expressao')
  if (!exp) return

  expressao = exp
  atualizarTela()
})

toggle.addEventListener('click', () => {
  painel.classList.toggle('ativo')
})

atualizarTela()