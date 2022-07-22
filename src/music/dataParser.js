const fs = require('fs');

const fm = () => {
    const filesX = fs.readdirSync(__dirname);
    const titles = filesX.filter(files => files.includes('.mp3'));
    return titles
}

const names = fm()

const mm = require('music-metadata');
const util = require('util');

let songsObjectArray = [];

const getSongsObject = async () => {
  for (let i = 0; i < names.length; i++) {
    try {
      const metadata = await mm.parseFile(`${__dirname}/${names[i]}`);
      console.log(metadata)
        let picture = metadata.common.picture[0];
        let encodedPicture = `data:${picture.format};base64,${picture.data.toString('base64')}`;
        let trackDuration = metadata.format.duration;
        let trackTitle = metadata.common.title;
        let trackArtist = metadata.common.artist;
        let path = `${__dirname}/${names[i]}`
        let name = `${names[i]}`
        let id = Date.now();
          let trackObj = { id, name, path, trackTitle, trackArtist, trackDuration, encodedPicture }
          songsObjectArray.push(trackObj);
    } catch (error) {
        console.error(error.message);
    }
  } return songsObjectArray;
}



module.exports = {
  getSongsObject
}