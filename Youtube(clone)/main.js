//api_key=AIzaSyCcsRDwiMsyxO1YaQty6R4eGlDFJUvT8U8
let poster_url, thumbnail_url, video_title, channel_title, views_count, upload_time,video_duration;

// thumbnail_url--> channelId
// views_count--> videoId
let channel_id, video_id;

let grid = async ()=>{
    try {
        let data = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q=hindi+songs+2023+mv&type=video&maxResults=21&videoDuration=medium&eventType=completed&regionCode=IN&key=AIzaSyCcsRDwiMsyxO1YaQty6R4eGlDFJUvT8U8");
        let finalData = await data.json();
        let video_array = finalData.items;
        // console.log(video_array);
        let video_grid = document.querySelector(".video_grid");
        for (const element of video_array) {

            upload_time = element.snippet.publishedAt;
            poster_url = element.snippet.thumbnails.high.url;
            video_title = await truncateText(element.snippet.title, 80);
            channel_title = element.snippet.channelTitle;
            video_id = element.id.videoId;
            let v = await viewCount(video_id);
            let [count , duration] =v
            views_count = abbreviateViews(count);
            console.log(views_count);
            video_duration = await formatDuration(duration);
            console.log(video_duration);
            channel_id = element.snippet.channelId;
            thumbnail_url = await viewPoster(channel_id);
            let div = document.createElement("div");
            div.innerHTML=
            `<div class="grid">
                <div class="thumbnail">
                    <img src=${poster_url} alt="posterUrl">
                   
                </div>
                <div class="video_info">
                    <div class="channel-picture">
                        <img class="thumbnail-pic" src=${thumbnail_url} alt="channel-picture">
                        <div class="duration">${video_duration}</div>
                    </div>
                    <div class="content-details">
                        <ul>
                            <li class="video-title">${video_title}</li>
                            <li>${channel_title}</li>
                            <li>${views_count}  &#8226 ${upload_time}</li>
                        </ul>
                    </div>
                </div>
            </div>`;

            video_grid.appendChild(div);
        }
        
    } catch (error) {
        let e = new Error("promise rejected");
        console.log(e);
    }
  
}

let viewCount = async (values)=>{
    
    try {
        let data = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${values}&key=AIzaSyCcsRDwiMsyxO1YaQty6R4eGlDFJUvT8U8`);
        let finalData = await data.json();
        let video = finalData.items;
        let count_duration=[];
        video.forEach((element)=>{
             count_duration.push(element.statistics.viewCount);
             count_duration.push(element.contentDetails.duration);
        });
        return count_duration;
    } catch (error) {
        let e = new Error("promise rejected in viewCount");
        console.log(e);
    }
   
}

let viewPoster = async (value)=>{

    try {
        
        let data = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${value}&key=AIzaSyCcsRDwiMsyxO1YaQty6R4eGlDFJUvT8U8`);

        let finalData = await data.json();
        let channel_array = finalData.items;
        let url;
        channel_array.forEach(element => {
            url=element.snippet.thumbnails.high.url;
        });
        return url;
    } catch (error) {
        let e = new Error("promise rejected in viewPoster");
        console.log(e);
    }

}

async function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

async function formatDuration(duration) {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const [, hours, minutes, seconds] = duration.match(durationRegex);

    const parsedHours = parseInt(hours) || 0;
    const parsedMinutes = parseInt(minutes) || 0;
    const parsedSeconds = parseInt(seconds) || 0;
  
    const formattedDuration = parsedHours > 0
      ? `${parsedHours.toString().padStart(2, '0')}:${parsedMinutes.toString().padStart(2, '0')}:${parsedSeconds.toString().padStart(2, '0')}`
      : `${parsedMinutes.toString().padStart(2, '0')}:${parsedSeconds.toString().padStart(2, '0')}`;
  
    return formattedDuration;
}
  
async function abbreviateViews(views) {
    if (views >= 1000000000) {
      const billions = (views / 1000000000).toFixed(1);
      return billions.replace(/\.0$/, '') + 'B';
    } else if (views >= 1000000) {
      const millions = (views / 1000000).toFixed(1);
      return millions.replace(/\.0$/, '') + 'M';
    } else if (views >= 1000) {
      const thousands = (views / 1000).toFixed(1);
      return thousands.replace(/\.0$/, '') + 'K';
    } else {
      return views.toString();
    }
  }
grid();