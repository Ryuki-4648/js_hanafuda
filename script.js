
$.ajax({
    url: "hanafuda.json",
    type: "GET",
    dataType: "json",
  })

  // ----- 成功した場合の処理 ----- //
  .done(function(data) {
    //console.log(data);
    //console.log(data.items.length);

    // テーブルに出力
    var tBody = $('#tBody');

    $.each(data.items, function(index, value){
      var tr = '<tr>';
      var tdMonth= '<td>' + value.month + '月' + '</td>';
      var tdName = '<td>' + value.name + '</td>';
      var tdScore = '<td>' + value.score + '点' + '</td>';
      var trClose = '</tr>';
      tBody.append(tr + tdMonth + tdName + tdScore + trClose);
    });

    // セレクトボックス
    $('#select01').on('change', function(){
      // 選択した値を取得
      var select01 = $('#select01 option:selected').text();
      var value01 = $('#select01').val();
      var select02 = $('#select02 option:selected').text();
      var value02 = $('#select02').val();
    
      $.each($('#tBody tr'), function (index, element) {
        if (value01 == "") {
          $(element).css('display', '');
          return true;
        }
        
        var row_text = $(element).text();
        if (row_text.indexOf(select01) != -1) { // 月 一致した場合
          //$(element).css('display', '');
          if (row_text.indexOf(select02) != -1) { // 点 一致した場合
            $(element).css('display', '');
          } else {
            $(element).css('display', 'none');
          }
        } else {
          $(element).css('display', 'none');
        }

        // 値が見つからなかったら-1を返す。
      });
    });


  })

  // ----- 失敗した場合の処理 ----- //
  .fail(function() {
    alert('取得できませんでした。');
  });



  
  // --------------- リセットボタン --------------- //

  $('#reset').on('click', function(){
    $('[name=select01]').prop("selectedIndex", 0);
    $('[name=select02]').prop("selectedIndex", 0);
    $('tr').css('display', 'table-row');
  });