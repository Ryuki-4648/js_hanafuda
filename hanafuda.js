const hanafuda = {
  items: [
    {
      name: '松に鶴',
      score: 20,
      month: 1
    },
    {
      name: '松に赤短',
      score: 5,
      month: 1
    },
    {
      name: '松のカス',
      score: 1,
      month: 1
    },
    {
      name: '梅に鶯',
      score: 10,
      month: 2
    },
    {
      name: '梅に赤短',
      score: 5,
      month: 2
    },
    {
      name: '梅のカス',
      score: 1,
      month: 2
    },
    {
      name: '桜に幕',
      score: 20,
      month: 3
    },
    {
      name: '桜に赤短',
      score: 5,
      month: 3
    },
    {
      name: '桜のカス',
      score: 1,
      month: 3
    },
    {
      name: '藤に不如帰',
      score: 10,
      month: 4
    },
    {
      name: '藤に短冊',
      score: 5,
      month: 4
    },
    {
      name: '藤のカス',
      score: 1,
      month: 4
    },
    {
      name: '杜若に八橋',
      score: 10,
      month: 5
    },
    {
      name: '杜若に短冊',
      score: 5,
      month: 5
    },
    {
      name: '杜若のカス',
      score: 1,
      month: 5
    }
  ]
}

var json = JSON.stringify(hanafuda);
console.log(json);
//console.log(typeof json); // string(文字列)に変換される
