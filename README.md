# Descrição

Esse é um projeto Expo [Expo](https://expo.dev) desenvolvido com objetivo de facilitar organização de estudantes com o básico e necessário cronograma.

## Para utilizar:

1. Instale as dependências na pasta raíz

   ```bash
   npm install
   ```

2. Adicione o arquivo .env na raiz do projeto expo com a seguinte variável:

  EXPO_PUBLIC_URL_API=http://localhost:3004

3. Clone a api do repositório a seguir:
https://github.com/CauaSSaraiva/api-proj-frame-cauagean

4. Para execução da API execute os seguintes passos:
 a. Na pasta da api execute o comando no terminal: npm install
 b. crie o arquivo .env na raiz com as seguintes variáveis:
    - DATABASE_URL = 'mysql://root:<SUASENHA>@localhost:3306/<apiFrameworkCAUAGEAN>'  -> para usar mysql local, ou um link de conexão de bancos como neon.tech
    - JWT_KEY = '<QualquerChaveQueQueira>'
 c. execute no terminal na pasta raíz: npx prisma migrate dev --name "migracao inicial" 
 d. por fim rode a api com o seguinte comando no terminal: npm run dev


5. Inicie o expo

   ```bash
    npx expo start
   ```

6. Exiba o aplicativo abrindo uma página do navegador na url fornececida ou da maneira preferia (como expo go, build de desenv...): 
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

7. (OPCIONAL) - se quiser que abra automaticamente no navegador no link de conexão só rodar o seguinte comando:
   ```bash
   npm run web
   ```

