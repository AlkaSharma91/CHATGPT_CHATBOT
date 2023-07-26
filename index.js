import openai from "./config/open-ai.js";
import colors from "colors";
import readLineSync from "readline-sync";
async function main() {
  console.log(colors.bold.green(`Welcome to the chatbot program`));
  console.log(colors.bold.green(`You can now start chatting with the bot`));
   const chatHistory=[]
  while (true) {
    const userInput = readLineSync.question(colors.yellow("You: "));
    try {
        const messages=chatHistory.map(([role,content])=>({role,content}))
        messages.push({role:'user',content:userInput})
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        message: messages
      });
      const completionText=chatCompletion.data.choices[0].message.content;
      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green('Bot: ')+completionText)
        return;
      }
      console.log(colors.green('Bot: ')+completionText)
      //update history
      chatHistory.push(['user',userInput]);
      chatHistory.push(['assistant',completionText])
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}
main();
