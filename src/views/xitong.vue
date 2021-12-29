<template>
  <div class="right_main_under">
      <div
              id=" bar_dvn"
              ref="chart"
              style="width: 100%; height: 550px"
              @mousedown="mousedown()"
            ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        "http://www.antimmm.xyz": [
          "http://b2bb2.eaa.xyz",
          "http://b2bb2.eaa1.xyz",
          "http://b2bb2.eaa11.xyz",
        ],
        "https://351.200587798.xyz": [
          "http://zpz.com",
          "http://zpz1.com",
          "http://b2bb2.eaa11.xyz",
          "http://b2bb2.eaa.xyz"
        ],
      },
      testData: [],
      testLink: [],
      testLink1: [],
    };
  },
  created() {
    this.rest();
  },
  methods: {
    rest() {
      this.testLink1 = [];
      let test1 = [];
      let test2 = [];
      let test3 = [];
      let net = 100;
      let newtestData = [];
      let test = [];
      let test4 = [];
       let obj = {};
      Object.keys(this.list).forEach((item) => {
        test1.push({
          name: item,
          category: 0,
        });

        test3.push(
          this.list[item].map((item1) => {
            return {
              name: item1,
              category: 1,
            };
          })
        );
      });
      //  console.log(test1);
      // console.log(test3);
      test3.forEach((item, index) => {
        if (item.length > net) {
          test2.push(item.slice(0, net));
        } else {
          test2.push(item);
        }
      });
      newtestData = test1.concat(...test2);

     
      for (var i = 0; i < newtestData.length; i++) {
        if (!obj[newtestData[i].name]) {
          this.testData.push(newtestData[i]);
          obj[newtestData[i].name] = true;
        }
      }
      // console.log(testData);
      console.log(this.testData);
      // ==========================================线

      for (var key in this.list) {
        let a = key;

        test4.push(
          this.list[key].map((item, index) => {
            return {
              source: a,
              target: item,
            };
          })
        );
      }

      test4.forEach((item, index) => {
        if (item.length > net) {
          test.push(item.slice(0, net));
        } else {
          test.push(item);
        }
      });
      // console.log(...test);
      this.testLink.push(...test);
      this.testLink.forEach((item1) => {
        this.testLink1.push(...item1);
      });

      console.log(this.testLink);
    },
  },
};
</script>

<style>
h1 {
  font-size: 30px;
  color: #fff;
}
</style>