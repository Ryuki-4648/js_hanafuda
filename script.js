
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
    $.each(data.items, function(i, v){
      var tdMonth= '<td>' + v.month + '月' + '</td>';
      var tdName = '<td>' + v.name + '</td>';
      var tdScore = '<td>' + v.score + '点' + '</td>';
      tBody.append('<tr>' + tdMonth + tdName + tdScore + '</tr>');
    });

    // セレクトボックス
    $('#select01, #select02').on('change', function(){
      // 選択した値を取得
      var select01 = $('#select01 option:selected').text();
      var value01 = $('#select01').val();
      var select02 = $('#select02 option:selected').text();
      var value02 = $('#select02').val();
    
      $.each($('#tBody tr'), function (index, elem) {
        if (value01 == "") {
          $(elem).css('display', '');
          return true;
        }
        if (value02 == "") {
          $(elem).css('display', '');
          return true;
        }
        
        var row_text = $(elem).text();
        if (row_text.indexOf(select01) != -1) { // 月 一致した場合
          if (row_text.indexOf(select02) != -1) { // 点 一致した場合
            $(elem).css('display', '');
          } else {
            $(elem).css('display', 'none');
          }
        } else if (row_text.indexOf(select02) != -1) { // 点 一致した場合
          if (row_text.indexOf(select01) != -1) { // 月 一致した場合
            $(elem).css('display', '');
          } else {
            $(elem).css('display', 'none');
          }
        } else {
          $(elem).css('display', 'none');
        }
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