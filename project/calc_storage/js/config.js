// Configuration loader
export async function loadConfig() {
    try {
        const response = await fetch('./config.json');
        // A CONFIG VA MESSO IL PUNTO 
        if (!response.ok) throw new Error('Failed to load config');
        return await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}