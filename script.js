
$.ajax({
    url: "hanafuda.json",
    type: "GET",
    dataType: "json",
  })

  // ----- 成功した場合 ----- //
  .done(function(data) {
    //console.log(data);
    //console.log(data.items.length);


    // ■ 課題: テーブルに出力
    var tBody = $('#tBody');
    $.each(data.items, function(i, v){
      var tdMonth= '<td id="month">' + v.month + '月' + '</td>';
      var tdName = '<td id="name">' + v.name + '</td>';
      var tdScore = '<td id="score">' + v.score + '点' + '</td>';
      tBody.append('<tr>' + tdMonth + tdName + tdScore + '</tr>');
    });


    // ■ 課題: セレクトボックス
    $('#select01, #select02').on('change', function(){
      // 選択した値を取得
      var select01 = $('#select01 option:selected').text();
      var value01 = $('#select01').val();
      var select02 = $('#select02 option:selected').text();
      var value02 = $('#select02').val();

      $.each($('#tBody tr'), function () {
        if (value01 == "" || value02 == "") {
          $(this).removeClass('hidden');
          return true;
        }
        
        var text = $(this).text();
        if (text.indexOf(select01) != -1) {
          if (text.indexOf(select02) != -1) {
            $(this).removeClass('hidden');
          } else {
            $(this).addClass('hidden');
          }
        } else {
          if (text.indexOf(select02) != -1) {
            $(this).addClass('hidden');
          } else {
            $(this).addClass('hidden');
          }
        }
      });

      var hidden = $('#tBody tr.hidden');
      if ( hidden.length == data.items.length ) {
        $('#msg').addClass('show');
        $('#msg').text('該当する花札が見つかりませんでした。');
      } else {
        $('#msg').removeClass('show');
        $('#msg').text('');
      }

    });


    // ■ 課題: ソート処理
    $('#ascend').on('click', function(){
      var arr = $('#tBody tr').sort(function(a, b){
        var str01 = $(a).find();
      });
    });
  })

  // ----- 失敗した場合 ----- //
  .fail(function() {
    alert('取得できませんでした。');
  });



  
  // --------------- リセットボタン --------------- //

  $('#reset').on('click', function(){
    $('[name=select01]').prop("selectedIndex", 0);
    $('[name=select02]').prop("selectedIndex", 0);
    $('#tBody tr').removeClass('hidden');
    $('#msg').removeClass('show');
    $('#msg').text('');
  });