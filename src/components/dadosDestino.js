import './dadosDestino.css'
import React, { useState, useEffect } from 'react';

function DadosPessoais() {
    const [paises, setPaises] = useState([])
    const [cidades, setCidades] = useState([])
    const [code, setCode] = useState([])

    useEffect(() => {
        async function getCountry() {

            const pais = await (await fetch('https://amazon-api.sellead.com/country')).json()

            setPaises(pais)
        }
        async function getCity() {

            const cidade = await (await fetch('https://amazon-api.sellead.com/city')).json()
            setCidades(cidade)
        }

        getCountry()
        getCity()
    }, [])

    const sendCountryCode = (e) => {
        e.preventDefault()
        var countyryCode = e.target.value.substring(e.target.value.length - 2, e.target.value.length)
        setCode([...code, countyryCode])
        console.log(code)

    }
    return (
        <div className='container'>
            <form className='form'>
                <div className="dadosPessoais">
                    <h2>Dados Pessoais</h2>
                    <label htmlFor='nome'>Nome:</label>
                    <input type="text" name='nome' id='nome' required></input>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" placeholder='example@outlook.com' name='email' id='email' required></input>
                    <label htmlFor='tel'>Telefone:</label>
                    <input type="tel" placeholder="(xx) x xxxx-xxxx" pattern="[0-9]{2}-[0-9]{1}-[0-9]{4}-[0-9]{4}" id='tel' required></input>
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" placeholder='xxx.xxx.xxx-xx' pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})" required></input>

                </div>

                <div className='dadosDestino' >
                    <h2>Destino de interesse</h2>
                    <div className='selects'>
                        <label htmlFor="dentino">Pais de destino: </label>
                        <select id="paises" name="paises" multiple required>
                            {paises.map((pais) => {

                                return <option onClick={sendCountryCode}>{pais.name} - {pais.code}</option>
                            })}
                        </select>
                    </div>

                    <div className='selects'>
                        <label htmlFor="cidades">Cidade de destino: </label>
                        <select id="cidades" name="cidades" multiple required>
                            {cidades.map((cidade) => {
                                for (var i = 0; i < code.length; i++) {
                                    if (cidade.country_code == code[i]) { return <option>{cidade.name}</option> }
                                }
                            })}
                        </select>
                    </div>
                </div>

            </form>
            <button id='button'>Enviar</button>
        </div>


    );
}

export default DadosPessoais;
