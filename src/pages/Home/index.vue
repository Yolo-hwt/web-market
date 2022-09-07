<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in foolList"
      :key="floor.id"
      :floorlist="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
//引入mapGetters
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters({
      foolList: "floorListGetter",
      token: "userTokenGetter",
    }),
  },
  methods: {
    async getData() {
      try {
        //派发action获取floor组件数据
        await this.$store.dispatch("getFloorList");
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style>
</style>