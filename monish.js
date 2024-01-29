const axios = require('axios');
const { Parser } = require('json2csv');
const fs = require('fs');

const apiToken = '2ca60b10390c5dc78e87f865e2b6455f';
const baseUrl = 'https://rest.entitysport.com/v2/players';
let allData = [];

const fetchData = async (page = 1, totalPages = Infinity) => {
    if (page > totalPages) return;

    try {
        console.log(`Fetching data for page ${page}/${totalPages}...`);
        const response = await axios.get(`${baseUrl}?country=ae&token=${apiToken}&paged=${page}`);
        const data = response.data;

        if (data && data.response && data.response.items) {
            allData.push(...data.response.items);
            console.log(`Page ${page} fetched successfully. Total items fetched: ${allData.length}`);

            totalPages = data.response.total_pages || totalPages; // Update total pages if available
            if (page < totalPages) {
                await fetchData(page + 1, totalPages); // Fetch next page
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const saveToCSV = () => {
    if (allData.length === 0) {
        console.error('No data fetched. CSV will not be saved.');
        return;
    }

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(allData);
    fs.writeFile('players_data2en.csv', csv, (err) => {
        if (err) {
            console.error('Error writing to CSV:', err);
        } else {
            console.log('Data saved to players_dataus.csv');
        }
    });
};

fetchData().then(saveToCSV);
