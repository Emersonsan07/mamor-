# Integração Google Sheets (CRM Mamoré)

Para que os leads do seu site sejam salvos automaticamente em uma planilha do Google, siga os passos abaixo:

## 1. Preparar a Planilha
1. Crie uma nova **Planilha Google**.
2. Na primeira linha (cabeçalho), escreva exatamente:
   - Coluna A: `Data`
   - Coluna B: `Destino`
   - Coluna C: `Pessoas`
   - Coluna D: `WhatsApp`
   - Coluna E: `Origem` (Indica se veio do Formulário Principal ou do Popup de Saída)

## 2. Configurar o Script (O "Cérebro")
1. Na planilha, vá em **Extensões** > **Apps Script**.
2. Apague todo o código que aparecer lá e cole o seguinte:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Adiciona a linha na planilha
  sheet.appendRow([
    new Date(), 
    data.destination || "", 
    data.people || "1", 
    data.phone || "",
    data.source || "Formulário Principal"
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publicar como Web App
1. Clique em **Implantar** (botão azul no topo) > **Nova implantação**.
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" e escolha **App da Web**.
3. Em "Quem pode acessar", selecione **Qualquer pessoa** (Isso é fundamental para o site conseguir enviar os dados).
4. Clique em **Implantar**, autorize as permissões da sua conta e **COPIE a URL do App da Web** gerada.

---

## 4. O que faremos a seguir
Assim que você me enviar a **URL do App da Web**, eu irei atualizar o código do seu site (`script.js`) para que cada vez que alguém clicar em "Enviar", os dados caiam direto na sua planilha!
