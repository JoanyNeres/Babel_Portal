
        const alunos = [
            {
                nome: "Amanda da Silva",
                email: "amanda@email.com",
                matricula: 1000,
                faltas: 0,
                curso: "inglês",
                notas: [8, 10, 10, 9],
            },
            {
                nome: "Roberto Barbosa",
                email: "roberto@email.com",
                matricula: 2000,
                faltas: 1,
                curso: "francês",
                notas: [6, 7, 7, 8],
            },
            {
                nome: "Patricia Lima",
                email: "patricia@email.com",
                matricula: 3000,
                faltas: 6,
                curso: "espanhol",
                notas: [5, 6, 4, 7],
            }
        ]

        const professores = [
            {
                nome: "Arnaldo Costa",
                senha: 123456,
            },
            {
                nome: "Eduardo Gomes",
                senha: 654321,
            },
        ]

 
        let ambiente = prompt(
            "Bem-vindo ao Portal Acadêmico da Escola de Babel! 🌎 \n"
            + "Você é aluno ou professor? (A/P)"
            ).toUpperCase();
    

        function menuGeral(ambiente) {
            while (ambiente !== "A" && ambiente !== "P"){
                ambiente = prompt(
                    "Opção inválida. \n"
                    + "Você é aluno ou professor? (A/P)"
                ).toUpperCase();

                return menuGeral(ambiente);
            }
            if (ambiente === "A") {
                const matriculaDigitada = parseInt(prompt(
                    "Digite a sua matrícula."
                    ))
                return exibeAlunoParaAluno(matriculaDigitada)
            }

            else if (ambiente === "P") {
                const senhaDigitada = parseInt(prompt(
                    "Digite a sua senha de acesso."
                    ))
                return menuProfessor(senhaDigitada);
            }
        }


        
        //Funções do Aluno
        
        function exibeAlunoParaAluno(matriculaDigitada) {
            const alunoUsuario = alunos.find(
                aluno => aluno.matricula === matriculaDigitada
            )
                if (alunoUsuario === undefined){
                    const matriculaDigitada = parseInt(prompt(
                        "Matrícula não encontrada.\n"
                        +"Digite a sua matrícula."
                    ))
                    return exibeAlunoParaAluno(matriculaDigitada)
                }
                    
            const somaNotasAluno = alunoUsuario.notas.reduce((acumulador, nota) =>
                acumulador += nota, 0
            )
            
            const mediaAluno = somaNotasAluno/alunoUsuario.notas.length
            
            let comentarioNotas = ""
                if (mediaAluno > 8) {
                    comentarioNotas = "Parabéns! O seu desempenho está excelente."
                }
                else if (mediaAluno < 9 && mediaAluno > 6) {
                    comentarioNotas = "O seu desempenho está bom. Não deixe de praticar."
                }
                else if (mediaAluno < 7) {
                    comentarioNotas = "O seu desempenho não está bom. Precisa reforçar os estudos."
                }

            let comentarioFaltas = undefined
                if (alunoUsuario.faltas === 1) {
                    comentarioFaltas = "Você possui 1 falta."
                }
                else if (alunoUsuario.faltas > 1) {
                    comentarioFaltas = "Você possui " + alunoUsuario.faltas + " faltas."
                }
            
            const dadosAluno = (
                "Olá, " + alunoUsuario.nome + "! \n"
                + "\n"
                + "Suas notas disponíveis no curso de " + alunoUsuario.curso + ": "
                + JSON.stringify(alunoUsuario.notas) + "\n"
                + comentarioNotas + "\n"
                + (comentarioFaltas || "")
            )
            
            return alert(dadosAluno);    
        }
                
              
                
        //Funções do Professor

        function menuProfessor(senhaDigitada) {
            const professorUsuario = professores.find(
                professor => professor.senha === senhaDigitada
            )
                    let menuProfessor = parseInt(prompt(
                        "Olá, " + professorUsuario.nome + "! \n"
                        + "\n"
                        + "Digite uma opção: \n"
                        + "1. Consultar aluno \n"
                        + "2. Cadastrar aluno \n"
                        + "3. Inserir nota \n"
                        + "4. Inserir falta"
                    )) 
                    if (menuProfessor === 1){
                      return consultarAluno(senhaDigitada)  
                    }
                    if (menuProfessor === 2){
                        return cadastrarAluno(senhaDigitada)
                    }
                    if (menuProfessor === 3){
                        return inserirNotas(senhaDigitada)
                    }
                    if (menuProfessor ===4 ){
                        return inserirFaltas(senhaDigitada);
                    }
        }
        

        function consultarAluno(senhaDigitada) {
            const matriculaDigitada = parseInt(prompt("Insira a matrícula do aluno:"));
            const alunoSelecionado = alunos.find(
                aluno => aluno.matricula === matriculaDigitada
            )
            const dadosAlunoSelecionado = JSON.stringify(alunoSelecionado)
            const novaConsulta = (prompt(
                dadosAlunoSelecionado + "\n"
                + "\n"    
                + "Deseja retornar ao menu anterior? (S/N)").toUpperCase()
            )
                if (novaConsulta === "S") {
                    return menuProfessor(senhaDigitada)
                }
        }

        

        function cadastrarAluno(senhaDigitada) {
            let novoEmail = prompt("Insira o email do aluno:"); 
            for (const aluno of alunos) {
                if (aluno.email === novoEmail){
                    alert("Aluno já cadastrado!");
                }
            }
            let novoNome = prompt("Insira o nome do aluno:");
            let novaMatricula = Math.round(Math.random()*10000);
            let matriculaExiste = alunos.find(
                aluno => aluno.matricula === novaMatricula
            )
                while (matriculaExiste === novaMatricula){
                    novaMatricula = Math.round(Math.random()*10000);
                    matriculaExiste = alunos.find(
                    aluno => aluno.matricula === novaMatricula
                    )
                }

            let novoCurso = parseInt(prompt(
                "Insira a opção de curso: \n"
                + "1. Inglês \n"
                + "2. Francês \n"
                + "3. Espanhol"
                ))
                if (novoCurso === 1){
                    novoCurso = "inglês"
                }
                else if (novoCurso === 2){
                    novoCurso = "francês"
                }
                else if (novoCurso === 3){
                    novoCurso = "espanhol"
                }
            alunos.push({
                nome: novoNome,
                email: novoEmail,
                matricula: novaMatricula,
                faltas: 0,
                curso: novoCurso,
                notas: []
            })
            const dadosAluno =
                "Aluno cadastrado com sucesso! \n"
                + "\n"
                + "Nome: " + novoNome + "\n"
                + "Email: " + novoEmail + "\n"
                + "Matrícula: " + novaMatricula + "\n"
                + "Curso: " + novoCurso

            const consultaProfessor = (prompt(
                dadosAluno + "\n"
                + "\n"    
                + "Deseja retornar ao menu anterior? (S/N)").toUpperCase()
            )
                if (consultaProfessor === "S") {
                    return menuProfessor(senhaDigitada)
                }
        }


        function inserirNotas(senhaDigitada) {
            const matriculaDigitada = parseInt(prompt("Insira a matrícula do aluno:"));
            const alunoSelecionado = alunos.find(
                aluno => aluno.matricula === matriculaDigitada
            )
            
            while (alunoSelecionado.notas.length < 4) {
                let notaAtribuida = parseFloat(prompt("Insira a nota do(a) aluno(a) " + alunoSelecionado.nome + ":"));
                alunoSelecionado.notas.push(notaAtribuida);
            }

            let desejaContinuar = prompt("Deseja retornar ao menu anterior? (S/N)").toUpperCase();
                if (desejaContinuar === "S"){
                    return menuProfessor(senhaDigitada)
                }
        }

        function inserirFaltas(senhaDigitada) {
            const matriculaDigitada = parseInt(prompt("Insira a matrícula do aluno:"));
            const alunoSelecionado = alunos.find(
                aluno => aluno.matricula === matriculaDigitada
            )

            let faltaAtribuida = parseInt(prompt("Insira o número de faltas do aluno:"));
            alunoSelecionado.faltas = alunoSelecionado.faltas + faltaAtribuida;
            let desejaContinuar = prompt("Deseja retornar ao menu anterior? (S/N)").toUpperCase();
                if (desejaContinuar === "S"){
                    return menuProfessor(senhaDigitada)
                }
        }



        menuGeral(ambiente);