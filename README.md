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
3. Inicie o projeto com `npm start`
4. Acesse `http://localhost:3000`.


## Importante
A lista de estações é limitada, todas estão no arquivo [stations.json](/src/stations.json), que contém o nome da estação, assim como seu endereço, latitude e longitude e o venue id, que é utilizado para obter informações detalhadas da estação a partir da Foursquare API.


## React App
Esse projeto foi criado com [Create React App](https://github.com/facebookincubator/create-react-app).


## Estações
A lista de estações originalmente foi obtida através do seguinte arquivo [stations.json](https://gist.github.com/rafaelrinaldi/6a82dd1eceed6dfc7deb), de forma que foi alterada e apenas algumas estações foram selecionadas para serem listadas neste projeto.
