var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)
submitButton.addEventListener('click', clear)

    function run(event) {
        event.preventDefault()

        var zipCode = zipCodeField.value

        zipCode = zipCode.replace(/[\. ,:-]+/g, "")

        axios
        .get('https://viacep.com.br/ws/'+ zipCode + '/json/')
        .then(function (response) {
            if (response.data.erro){
                throw new Error ('CEP invalido')
            }

            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine(response.data.localidade)
            createLine(response.data.uf)
        })
        .catch(function (error) {
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })
    }

    function createLine(text) {
        var line = document.createElement('p')
        var text = document.createTextNode(text)

        line.appendChild(text)
        content.appendChild(line)
    }

    function clear(event) {
        event.preventDefault()
        content.innerHTML = ''
    }