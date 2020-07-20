
(function () {
    
    var canvas = document.getElementById("canvas");
    var canvasCtx = canvas.getContext("2d");
    var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    
    loadSound("../../assets/video/chongqing.wav"); //调用
    // 定义加载音频文件的函数
    function loadSound(url) {
        var request = new XMLHttpRequest(); //建立一个请求
        request.open('GET', url, true); //配置好请求类型，文件路径等
        request.responseType = 'arraybuffer'; //配置数据返回类型
        // 一旦获取完成，对音频进行进一步操作，比如解码
        request.onload = function () {
            var arraybuffer = request.response;
            console.log(arraybuffer)
        }
        request.send();
    }
    var audioContext = new AudioContext();//ʵ����
    var init = function () {
        if (this.files.length == 0) return;
        var file = $('#musicFile')[0].files[0];//ͨ��input�ϴ�����Ƶ�ļ�
        var fileReader = new FileReader();//ʹ��FileReader�첽��ȡ�ļ�
        fileReader.readAsArrayBuffer(file);//��ʼ��ȡ��Ƶ�ļ�
        fileReader.onload = function (e) {//��ȡ�ļ���ɵĻص�

            audioContext.decodeAudioData(e.target.result, function (buffer) {
                clearInterval(timer)
                var audioBufferSourceNode = audioContext.createBufferSource();
                var analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                audioBufferSourceNode.connect(analyser);
                analyser.connect(audioContext.destination);
                console.log(audioContext.destination)
                audioBufferSourceNode.buffer = buffer; //�ص���������Ĳ���
                audioBufferSourceNode.start(); //�����������noteOn()�������÷���ͬ
                var bufferLength = analyser.frequencyBinCount;
                console.log(bufferLength);
                var dataArray = new Uint8Array(bufferLength);
                console.log(dataArray)
                canvasCtx.clearRect(0, 0, 500, 500);
                function draw() {
                    drawVisual = requestAnimationFrame(draw);
                    analyser.getByteFrequencyData(dataArray);
                    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    //canvasCtx.fillStyle = ;
                    canvasCtx.fillRect(0, 0, 500, 500);
                    var barWidth = (500 / bufferLength) * 2.5;
                    var barHeight;
                    var x = 0;
                    for (var i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i];
                        //�����0-255 Math.floor(Math.random()*255) 
                        // ����� 10*Math.random()
                        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',' + Math.floor(Math.random() * (20 - 120) + 120) + ',' + Math.floor(Math.random() * (10 - 50) + 50) + ')';
                        canvasCtx.fillRect(x, (500 - barHeight) / 2, barWidth, barHeight / 2);
                        x += barWidth + 1;
                    }
                };
                draw();
            });
        }
    }
    init()
})()