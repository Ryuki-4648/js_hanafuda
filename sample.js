$(function(){
  // 画面表示時に価格の合計値を計算
  var sum_price = sum();

  // カラムのクリックイベント
  $("th").click(function(){
    // ★attrメソッド：span要素の独自属性（sort）の値を取得
    var sortClass = $(this).find("span").attr("sort");
    var sortFlag = "asc";

    // attrメソッド：属性の値を取得、変更できる。id 属性や class 属性を取得・変更・設定できる。

    // 初期化
    $("table thead tr span").text("");
    $("table thead tr span").attr("sort", "");

    if(isBlank(sortClass) || sortClass == "asc") {
      $(this).find("span").text("▼");
      // ★独自属性（sort）の値を変更する
      $(this).find("span").attr("sort", "desc");
      sortFlag = "desc";
    } else if(sortClass == "desc") {
      $(this).find("span").text("▲");
      $(this).find("span").attr("sort", "asc"); 
      sortFlag = "asc";
    }

    var element = $(this).attr("id");
    sort(element, sortFlag);
  });

  // isBlank:指定された値がnullまたは空文字でないことをチェックする関数


  /******** 共通関数 ********/
  function sort(element, sortFlag) {
    // ★sort()で前後の要素を比較して並び変える。※対象が文字か数値で処理を変更
    var arr = $("table tbody tr").sort(function(a, b) {
      if ($.isNumeric($(a).find("td").eq(element).text())) {
        // ソート対象が数値の場合
        var a_num = Number($(a).find("td").eq(element).text());
        var b_num = Number($(b).find("td").eq(element).text());

        if(isBlank(sortFlag) || sortFlag == "desc") {
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
        if(isBlank(sortFlag) || sortFlag == "desc") {
          // 降順
          sortNum *= (-1) ;
        }

        return sortNum;
      }
    });
    // ★html()要素を置き換える
    $("table tbody").html(arr);
  }

  // isNumeric:式を数値として評価できるかどうかを示すブール型 (Boolean) の値を返す
  
  // eq:エレメントの集合から、指定したポジションのエレメントだけを取り出す。
  // 複数のHTML要素の中からインデックス番号を指定することで特定の要素だけを取得できます。

  function sum(){
    // 表の金額を取得する(tdの奇数列を取得)
    var pricelist = $("table td[class=price]").map(function(index, val){
      var price = parseInt($(val).text());
      if(price >= 0) {
        return price;
      } else {
        return null;
      }
    });
    // 価格の合計を求める
    var total = 0;
    pricelist.each(function(index, val){
      total = total + val;
    });
    $(".sum_price").text("合計："+total+"円");
  }

  //バリデーションチェック
  function isBlank(data){
    if (data.length ==0 || data == ''){
      return true;
    } else {
      return false;
    }
  }
});