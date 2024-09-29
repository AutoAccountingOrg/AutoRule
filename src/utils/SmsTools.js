export function splitSms(content) {
  let json = JSON.parse(content);

  const match1 = json.body.match(/^【(.*?)】(.*)$/);
  if (match1) {
    const [, bankName, text] = match1;
    return {
      "sender": json.sender,
      bankName,
      text,
      "t": json.t,
    };
  }

  const match2 = json.body.match(/^(.*)【(.*?)】$/);
  if (match2) {
    const [, text, bankName] = match2;
    return {
      "sender": json.sender,
      bankName,
      text,
      "t": json.t,
    };
  }

  throw new Error('不支持处理的消息格式');
}
