const API_KEY = "37035090-7aeb-4e47-b922-6a6bcb3886a1";
const CHATBOT_ID = "OnKiXSNEIEt2VcTnPUbWQ";

async function accessChatBase(convoId: string, input: string) {
  const response = await fetch("https://www.chatbase.co/api/v1/chat", {
    body: JSON.stringify({
      chatbotId: `${CHATBOT_ID}`,
      conversationId: `${convoId}`,
      messages: [{ content: `${input}`, role: "user" }],
    }),
    headers: { Authorization: `Bearer ${API_KEY}` },
    method: "POST",
  });

  if (!response.ok) {
    const errorData: any = await response.json();
    throw Error(errorData.message);
  }
  const data: any = await response.json();
  console.log(data);

  return data.text;
}

export default class Chatbase {
  constructor() {
    // No initialization required for Chatbase
  }

  async sendMessage(content, contactId) {
    try {
      // Call the Chatbase API to send the message
      const response: any = await accessChatBase(contactId, content);
      return response;
    } catch (error: any) {
      console.error("Error sending message to Chatbase:", error.message);
      throw error;
    }
  }
  async replyMessage(contact, content) {
    const { id: contactId } = contact;
    try {
      // Send the message to Chatbase and get the response
      const message = await this.sendMessage(content, contactId);

      // Send the response message back to the contact
      console.log(`${message}`);
      await contact.say(`${message}`);
    } catch (error: any) {
      console.error("Error replying to message:", error.message);
      // Handle error appropriately
    }
  }
}
