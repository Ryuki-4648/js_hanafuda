// ■ 課題: データの取得
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

      // 該当するものがない場合
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
    $('#tbl th').on('click', function(){
      var sortClass = $(this).find('span').attr('sort');
      //console.log(sortClass);
      var sortFlg = 'asc';

      //$('#tbl thread tr span').text('');
      $('#tbl thread tr span').attr('sort', '');

      if( sortClass == 'asc' || sortClass != '' ) {
        $(this).find('span').attr('sort', 'desc');
        $(this).find('.btn-ascend').addClass('change');
        $(this).find('.btn-descend').removeClass('change');
        sortFlg == 'desc';
      } else if ( sortClass == 'desc') {
        $(this).find('span').attr('sort', 'asc');
        sortFlg == 'asc';
        $(this).find('.btn-ascend').removeClass('change');
        $(this).find('.btn-descend').addClass('change');
      }

      var element = $(this).attr('id'); // thのid="値"を取得
      sortFunc(element, sortFlg); // 関数の実行
    });

    function sortFunc(element, sortFlg) {
      var arr = $('#tBody tr').sort(function(a, b){
        if ($.isNumeric($(a).find('td').eq(element).text())) {
          var a_num = Number($(a).find('td').eq(element).text());
          var b_num = Number($(a).find('td').eq(element).text());

          if(sortFlg == "desc") {
            // 降順
            return b_num - a_num;
          } else {
            // 昇順
            return a_num - b_num;
          }
        } else {
          // ソート対象が数値以外の場合
        var sortNum = 1;
        if($(a).find("td").eq(element).text() 
            > $(b).find("td").eq(element).text()) {
          sortNum = 1;
        } else {
          sortNum = -1;
        }
        if(sortFlg == "desc") {
          // 降順
          sortNum *= (-1) ;
        }

        return sortNum;
        }
      });
      $("table tbody").html(arr);
    }
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