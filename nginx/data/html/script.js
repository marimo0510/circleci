$("#capture").on("click", function() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true},app.success,app.error);
  } else {
    console.log("getUserMedia not supported");
  }
});


var mediaRecorder = new MediaRecorder(stream);

var rec = {
  
  record: function(stream) {
    mediaRecorder.start();
  },

  stop: function() {
    mediaRecorder.stop();
  },

  mediaRecorder.ondataavailable = function(e) {
    console.log("data available after MediaRecorder.stop() called.");

    var audio = document.createElement('audio');
    audio.setAttribute('controls', '');
    var audioURL = window.URL.createObjectURL(e.data);
    audio.src = audioURL;
  }
}

// Google Cloud Speech APIで使うAPIキー
var key = "";
 
//$('document').ready(function() {
  var app = {
    // ファイルを読み込むためのオブジェクトです
    reader: new FileReader(),
 
    // キャプチャ成功時のコールバックです
    success: function(files) {

        console.log("success_start");
        var file = files[0];

        $("#audio").attr("src", file.fullPath);
       
        // ファイルを読み込んだ時のコールバックを指定
        app.reader.onloadend = app.load_file;
       
        // Fileオブジェクトを作成します
        audioFile = new window.File(
          file.name, 
          file.localURL,
          file.type,
          file.lastModifiedDate,
          file.size
        );
       
        // ファイルを読み込みます（Base64で取得できます）
        app.reader.readAsDataURL(audioFile);

        console.log("success_end");
      },
 
    // ファイルを読み込むと呼ばれるコールバックです
    load_file: function() {

        console.log("loadfile_start");
        // base64文字列を取得
        var result = app.reader.result;
        var encoding;
        var sample_rate;
       
        if(result.indexOf("data:audio/amr;") === 0) {
          // 音声データがamrの場合
          encoding = "AMR";
          sample_rate = 8000;
        } else {
          // 音声データがwavの場合
          encoding = "LINEAR16";
          sample_rate = 44100;
        }
       
        // data:audio/wav;base64,aaa... といった形式で取得
        // されるので、,以降だけにします
        var ary = result.split(",");
       
        // Google Cloud Speech APIに投げるデータフォーマットを作成
        var json = {
          "config": {
            "encoding": encoding,
            "sample_rate": sample_rate,
            "language_code": "ja_JP"
          },
          "audio": {
            "content": ary[1]
          }
        };
       
        // 音声認識処理を実行します
        app.voice_recognition(json);
        console.log("loadfile_end");
      },
 
    // Google Cloud Speech APIをコールします
    voice_recognition: function(json) {

        console.log("voice_recognition_start");
        // AjaxでPOST処理
        $.ajax({
            type: 'POST',
            url: 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=' + key,
            data: JSON.stringify(json),
            dataType:'json',
            contentType: 'application/json'
        }).done(function(data) {
            // 処理結果をテキストエリアに表示
            $("#result").val(data.results[0].alternatives[0].transcript);
        }).fail(function(error) {
            alert("Speech API Error:" + JSON.stringify(error)); 
        });

        console.log("voice_recognition_end");
      },
 
    // キャプチャ失敗時のコールバックです
    error: function(error) {
      alert("Capture Error:" + error);
    }
  };
//});


  

  