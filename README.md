# Neighborhood
Esta aplicação lista algumas estações do Metrô/CPTM de São Paulo, permitindo que o usuário filtre por alguma estação, além de obter dados de uma estação selecionada, provenientes da Foursquare API.


## Índice
- [Instruções](#instruções)
- [Importante](#importante)
- [React App](#react-app)
- [Estações](#estações)


## Instruções
1. Baixe ou clone o repositório.
2. Na pasta do repositório, instale o projeto com `npm install`


Para acessar a versão local:
1. Inicie o projeto com `npm start`
2. Acesse `http://localhost:3000`.

Para acessar a versão de produção:
1. Gere os arquivos para produção `npm run build`
2. Inicie o servidor com `serve -s build`
3. Acesse `http://localhost:5000`.


## Importante
A lista de estações é limitada, todas estão no arquivo [stations.json](/src/stations.json), que contém o nome da estação, assim como seu endereço, latitude e longitude e o venue id, que é utilizado para obter informações detalhadas da estação a partir da Foursquare API.


## React App
Esse projeto foi criado com [Create React App](https://github.com/facebookincubator/create-react-app).


## Estações e ícones
A lista de estações originalmente foi obtida através do seguinte arquivo [stations.json](https://gist.github.com/rafaelrinaldi/6a82dd1eceed6dfc7deb), de forma que foi alterada e apenas algumas estações foram selecionadas para serem listadas neste projeto.
O ícone do menu e do ponteiro do mapa foi obtido através de Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) do site [www.flaticon.com](https://www.flaticon.com/), licensiado por is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
