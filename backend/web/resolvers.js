const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    getFilteredPosts: async (_, { offset, limit, titleFilter, genreFilter, yearFilter } ) => {
      //let filters = "";
      let data = await Post.find();

      if (titleFilter != "") {
        //filters += "title: { $regex: new RegExp(" + titleFilter + ", 'i' )}"
        data = await Post.find({ title: { $regex: new RegExp(titleFilter, "i") } });
      } if (genreFilter != "") {
        /*
        if (filters != "") {
          filters += ", genres: { $all : [genreFilter] }";
        } else {
          filters += "genres: { $all : [genreFilter] }";
        }*/
        data = await Post.find({ genres : { $all : [genreFilter] }});
      } if (yearFilter != 0) {
        /*
        if (filters != "") {
          filters += ", year: yearFilter"
        } else{
          filters += "year: yearFilter"
        }*/
        data = await Post.find({ year: yearFilter });
      } 
      /*
      var json = "{" + filters + "}"
      console.log(json)
      if (filters != "") {
        var json = "{" + filters + "}"
        var obj = JSON.parse(JSON.stringify(json));
        console.log(obj)
        data = await Post.find(obj)
      } */
      return data.slice(offset, limit + offset);
    },

    getFilteredPostsByGenre: async (_, { offset, limit, filter } ) => {
      const data = await Post.find({ genres: { $regex: new RegExp(filter, "i") } })
      return data.slice(offset, limit + offset);
    },

    getFilteredPostsByYear: async (_, { offset, limit, filter } ) => {
      const data = await Post.find({ year: filter })
      return data.slice(offset, limit + offset);
    },

    getAllPosts: async (_, { offset, limit } ) => {
      const data = await Post.find();
      return data.slice(offset, limit + offset);
    },
  }
};

module.exports = resolvers;