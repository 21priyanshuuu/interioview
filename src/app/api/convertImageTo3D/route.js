import Replicate from "replicate";

export async function POST(req) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return new Response(JSON.stringify({ error: "Image URL is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN, // Use API key from env
        });

        const output = await replicate.run(
            "adirik/wonder3d:1601c3f698013b29019522c62944713b62af1348a7111ed1e57663fdafd507e7",
            { input: { image: imageUrl } }
        );

        if (!output) {
            return new Response(JSON.stringify({ error: "Failed to generate model" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Fetch model file
        const response = await fetch(output);
        const buffer = await response.arrayBuffer();

        return new Response(Buffer.from(buffer), {
            status: 200,
            headers: {
                "Content-Disposition": "attachment; filename=model.glb",
                "Content-Type": "model/gltf-binary",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
