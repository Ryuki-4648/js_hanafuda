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
    console.log('hanafuda.jsonのデータを取得できました。');


    // ■ 課題: テーブルに出力
    var tBody = $('#tBody');
    $.each(data.items, function(i, v){
      var tdMonth= '<td id="month">' + '<span>' + v.month + '</span>' + '月' + '</td>';
      var tdName = '<td id="name">' + '<span>' + v.name + '</span>' + '</td>';
      var tdScore = '<td id="score">' + '<span>' + v.score + '</span>' + '点' + '</td>';
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


    // ■ 課題: ソート処理 ( 参考： https://notepad-blog.com/content/127/ )
    $('#tbl th').on('click', function(){
      $(this).find('span').removeClass('change');
      var flg = $(this).find('p').attr('sort');
      var index = $(this).attr('id');
      //console.log(index);

      if( flg == 'asc') {
        $(this).find('p').attr('sort', 'desc');
        $(this).find('.btn-ascend').addClass('change');
        flg == 'desc';
      } else if ( flg == 'desc' ) {
        $(this).find('p').attr('sort', 'asc');
        $(this).find('.btn-descend').addClass('change');
        flg == 'asc';
      }

      sortFunc(index, flg);
    });

    function sortFunc(index, flg) {
      //console.log(flg);
      var arr = $('#tBody tr').sort(function(a, b){

        // isNumeric: 引数に指定した値が数値かどうかを判定
        // eq(): インデックス番号からHTML要素を取得。eq(index)はthのid="数値"。
        if ( $.isNumeric($(a).find('td span').eq(index).text()) ) {
          // console.log('数値のとき');

          // 文字列を数値に変換
          var aNum = Number($(a).find('td span').eq(index).text());
          var bNum = Number($(b).find('td span').eq(index).text());
          //console.log(aNum);

          // 数値を比較する場合は引き算
          if( flg == "desc" ) {
            return bNum - aNum;
          } else {
            return aNum - bNum;
          }

        } else {
          // console.log('数値以外の時');
          var sortNum = 1;
          if($(a).find('td span').eq(index).text() > $(b).find('td span').eq(index).text()) {
            sortNum = 1;
          } else {
            sortNum = -1;
          }
          if( flg == '' || flg == "desc" ) {
            sortNum = -1;
          }

          return sortNum;
        }
      });
      $('#tBody').html(arr);
    }
    
    // --------------- リセットボタン --------------- //
    $('#reset').on('click', function(){
      $('[name=select01]').prop("selectedIndex", 0);
      $('[name=select02]').prop("selectedIndex", 0);
      $('#tBody tr').removeClass('hidden');
      $('#msg').removeClass('show');
      $('#msg').text('');
      $('#tbl th').find('span').removeClass('change');
    });

  })

  // ----- 失敗した場合 ----- //
  .fail(function() {
    alert('取得できませんでした。');
  });
