const BASE_URL = "https://www.abibliadigital.com.br/api/";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro na busca dos dados");
    }
    return response.json();
};

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const searchAllBooks = () => fetchData("books");

const getBook = (abbrev) => fetchData(`books/${abbrev}`);

const getChapter = (abbrev, chapter) => fetchData(`verses/nvi/${abbrev}/${chapter}`);

export { searchAllBooks, getBook, getChapter };
