import { create } from 'zustand';
import { octokit } from "../utils/octokit";

const usePriceStore = create((set) => ({
  price: [], // Initialize price as an empty array
  isLoading: false,
  fetch: async () => {
    set({ isLoading: true });
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "dzemenu",
          repo: "zemaprice",
          path: "zemaprice.json",
        }
      );
      const encoded = await response.data.content;
      const decoded = atob(encoded);

      set({ price: JSON.parse(decoded), isLoading: false }); // Ensure price is set as an array
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ isLoading: false });
    }
  },
}));

export default usePriceStore;
