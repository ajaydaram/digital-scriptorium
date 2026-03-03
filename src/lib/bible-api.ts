
export interface Scripture {
  reference: string;
  text: string;
  version: string;
}

const MOCK_SCRIPTURES: Record<string, string> = {
  "John 3:16": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  "Psalm 23:1": "The LORD is my shepherd; I shall not want.",
  "Genesis 1:1": "In the beginning God created the heaven and the earth.",
  "Matthew 5:3": "Blessed are the poor in spirit: for theirs is the kingdom of heaven."
};

export async function fetchScripture(reference: string): Promise<Scripture> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const text = MOCK_SCRIPTURES[reference] || "Scripture passage not found in this mock demo.";
  
  return {
    reference,
    text,
    version: "KJV"
  };
}
