export const samplePrompts = [
  "A majestic mountain landscape at golden hour with a crystal clear lake reflecting the peaks",
  "A futuristic robot sitting in a cozy library reading a book",
  "An ancient Japanese temple surrounded by cherry blossoms in full bloom",
  "A steampunk airship floating above a Victorian city at sunset",
  "A magical forest with glowing mushrooms and ethereal light filtering through the trees",
  "A bustling cyberpunk city at night with neon signs and flying vehicles",
  "A serene Japanese garden with a koi pond and traditional tea house",
  "An astronaut exploring a vibrant alien planet with exotic flora and fauna",
  "A medieval castle perched on a cliff overlooking a stormy sea",
  "A whimsical treehouse village nestled in a giant ancient tree",
  "A futuristic laboratory with glowing experiments and advanced machinery",
  "A cozy cabin in a snowy forest with smoke rising from the chimney",
  "A vibrant coral reef teeming with colorful fish and marine life",
  "A desert oasis with palm trees, a clear spring, and ancient ruins",
  "A bustling marketplace in a fantasy world with diverse creatures and magical artifacts",
  "A tranquil lakeside scene at sunrise with mist rising from the water",
  "A powerful dragon soaring over a volcanic landscape",
  "A hidden waterfall in a lush jungle with exotic birds",
  "A futuristic cityscape with towering skyscrapers and sky bridges",
  "A peaceful meadow filled with wildflowers and butterflies",
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
