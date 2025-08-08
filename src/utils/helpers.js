export const samplePrompts = [
  "A majestic mountain landscape at golden hour with a crystal clear lake reflecting the peaks",
  "A futuristic robot sitting in a cozy library reading a book",
  "An ancient Japanese temple surrounded by cherry blossoms in full bloom",
  "A steampunk airship floating above a Victorian city at sunset",
  "A magical forest with glowing mushrooms and ethereal light filtering through the trees",
];

export const generateImageURLs = (
  prompt,
  style,
  resolution,
  quality,
  count
) => {
  return Array.from({ length: count }, (_, i) => {
    const enhancedPrompt = `${prompt}, ${style} style, ${quality} quality, detailed`;
    const [width, height] = resolution.split("x");
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt
    )}?width=${width}&height=${height}&seed=${Date.now() + i}&nologo=true`;

    return {
      url: imageUrl,
      prompt,
      style,
      resolution,
      quality,
    };
  });
};

export const downloadImage = (url, prompt) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `ai-generated-${prompt
    .replace(/[^a-z0-9]/gi, "-")
    .toLowerCase()}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
