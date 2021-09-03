// ■ 課題: データの取得
$.ajax({
    url: "hanafuda.json",
    type: "GET",
    dataType: "json",
  })

  // ----- データの取得 成功した場合 ----- //
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
        
        // #tBody trの中のテキストを取得
        var text = $(this).text();

        if (text.indexOf(select01) > -1) {
          if (text.indexOf(select02) > -1) {
            $(this).removeClass('hidden');
          } else {
            $(this).addClass('hidden');
          }
        } else {
          $(this).addClass('hidden');
        }
      });
      // indeOf: 値が見つからなければ-1を返す
      // 文字列があるとき "文字列".indexOf("文字列") > -1 ⇔ "文字列".indexOf("文字列") != -1


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

      // 昇順・降順ボタン
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

    // 並び替え
    function sortFunc(index, flg) {
      var arr = $('#tBody tr').sort(function(a, b){

        // isNumeric: 引数に指定した値が数値かどうかを判定
        // eq(): インデックス番号からHTML要素を取得。eq(index)はthのid="数値"。
        if ( $.isNumeric($(a).find('td span').eq(index).text()) ) {
          // console.log('数値のとき');

          // 文字列を数値に変換
          var aNum = Number($(a).find('td span').eq(index).text());
          var bNum = Number($(b).find('td span').eq(index).text());
          //console.log(aNum);

          // 数値の比較: 引き算
          if( flg == "desc" ) {
            return bNum - aNum;
          } else {
            return aNum - bNum;
          }

        } else {
          // console.log('数値以外の時');
          var sortNum;
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

      // html要素(#tBody)の書き換え
      $('#tBody').html(arr);
    }
    
    // --------------- 選択肢 リセットボタン --------------- //
    $('#reset').on('click', function(){
      $('[name=select01]').prop("selectedIndex", 0);
      $('[name=select02]').prop("selectedIndex", 0);
      $('#tBody tr').removeClass('hidden');
      $('#msg').removeClass('show');
      $('#msg').text('');
    });

  })

  // ----- データの取得 失敗した場合 ----- //
  .fail(function() {
    alert('データを取得できませんでした。');
  });
