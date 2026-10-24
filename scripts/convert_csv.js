
import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(import.meta.dirname, '../vuetify-weekly_2025-03-30_2026-03-28.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const lines = csvContent.trim().split('\n');
const headers = lines[0].split(','); // ["", "vuetify"]

const labels = [];
const data = [];

// Skip header
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const parts = line.split(',');
  const date = parts[0];
  const downloads = parseInt(parts[1], 10);
  
  labels.push(date);
  data.push(downloads);
}

const result = {
  labels,
  datasets: [
    {
      label: 'Weekly Downloads',
      backgroundColor: 'rgba(24, 103, 192, 0.2)',
      borderColor: '#1867C0',
      pointBackgroundColor: '#1867C0',
      pointBorderColor: '#fff',
      pointRadius: 0, // Too many points, hide points by default
      pointHoverRadius: 4,
      data: data,
      tension: 0.4,
      fill: true,
      borderWidth: 2
    }
  ]
};

fs.writeFileSync('/Users/andreyyolkin/Projects/meetups/vuetify0/components/growth-data.json', JSON.stringify(result, null, 2));
console.log('JSON generated');
