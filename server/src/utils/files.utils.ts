import fs from 'fs';
import { Movie } from '../interfaces/movie.interface';

function createFileIfNotExists(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
}

function readJSONFile(filePath: string): Movie[] {
  try {
    createFileIfNotExists(filePath);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error('Error reading file', filePath, error);
    return [];
  }
}

function writeJSONFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing file', filePath, error);
  }
}

function removeJSONFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Removes the file
      console.log(`File ${filePath} has been removed successfully.`);
    } else {
      console.log(`File ${filePath} does not exist.`);
    }
  } catch (error) {
    console.error('Error removing file', filePath, error);
  }
}

export default {
  readJSONFile,
  writeJSONFile,
  removeJSONFile,
};
