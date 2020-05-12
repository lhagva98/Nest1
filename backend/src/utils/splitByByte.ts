export default function(textData: string, byteToLimit: number): string[] {
  let currentByte: number = 0;
  let lastCutIndex: number = 0;
  let chunks: string[] = [];
  for (let i = 0; i < textData.length; i++) {
    let byte = Buffer.byteLength(textData[i], "utf8");
    if (byteToLimit < currentByte + byte) {
      chunks.push(textData.slice(lastCutIndex, i));
      lastCutIndex = i;
      currentByte = 0;
    } else {
      currentByte = currentByte + byte;
    }
    if (textData.length <= i + 1) {
      chunks.push(textData.slice(lastCutIndex, i));
    }
  }
  console.log(chunks);
  return chunks;
}
