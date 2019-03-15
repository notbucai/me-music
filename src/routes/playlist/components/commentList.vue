<template>
  <div class="commentList">
    <h3>当前热评</h3>
    <ul class="comment">
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
      <li
        class="comment-item"
      >初中时候还是很喜欢听的。一转眼10多年都已经过去了。那时候晚上我开着台灯，用着200元买的不知名的MP3（生日礼物），里面装着从网上能下载到盗版的音乐，用着随机附送的耳机也没觉得有多low。偶尔复古也用复读机听听周杰伦的七里香，范特西磁带。</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommentList"
};
</script>

<style lang="scss" scoped>
.commentList {
  h3 {
    color: rgba(255, 255, 255, 0.692);
    margin-top: 20px;
    padding: 10px 20px;
    border-left: 8px solid #f5b1e4d7;
  }
}
.comment {
  &-item {
    padding: 20px;
    font-size: 20px;
    margin-left: 8px;
    /* color: #997690; */
    color: rgba(245, 177, 228, 0.3);
    text-indent: 40px;
    line-height: 36px;
    border-bottom: 1px dashed #f0c2e49c;
    &:last-child {
      border-bottom: none;
    }
    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) {
        color: rgba(
          $color: #f5b1e4,
          $alpha: (
            1 / $i
          )+0.2
        );
      }
    }
  }
}
</style>
