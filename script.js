
$.ajax({
    url: "hanafuda.json",
    type: "GET",
    dataType: "json",
  })

  // ----- 成功した場合 ----- //
  .done(function(data) {
    //console.log(data);
    //console.log(data.items.length);

    // ■ 課題1: テーブルに出力
    var tBody = $('#tBody');
    $.each(data.items, function(i, v){
      var tdMonth= '<td>' + v.month + '月' + '</td>';
      var tdName = '<td>' + v.name + '</td>';
      var tdScore = '<td>' + v.score + '点' + '</td>';
      tBody.append('<tr>' + tdMonth + tdName + tdScore + '</tr>');
    });

    // ■ 課題2: セレクトボックス
    $('#select01, #select02').on('change', function(){
      // 選択した値を取得
      var select01 = $('#select01 option:selected').text();
      var value01 = $('#select01').val();
      var select02 = $('#select02 option:selected').text();
      var value02 = $('#select02').val();

      $.each($('#tBody tr'), function () {
        if (value01 == "") {
          $(this).removeClass('hidden');
          return true;
        }
        if (value02 == "") {
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
            console.log('hoge');
          }
        }
      });
    });

    /*
    $('#select02').on('change', function(){
      var select02 = $('#select02 option:selected').text();
      var value02 = $('#select02').val();

      $.each($('#tBody tr'), function () {
        if (value02 == "") {
          $(this).removeClass('hidden');
          return true;
        }

        var text = $(this).text();
        if (text.indexOf(select02) != -1) {
          $(this).removeClass('hidden');
        } else {
          $(this).addClass('hidden');
        }
      });
    });
    */

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
  });