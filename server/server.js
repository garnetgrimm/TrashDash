import { Meteor } from 'meteor/meteor'

if(Meteor.isServer) {

  Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find({_id:this.userId});
  });

  Meteor.methods({
		Redeem: function (id) {
      console.log(!Meteor.user());
      if(!Meteor.user()) {
        return "Please Login"
      } else {
        qr = QrCode.find({_id:id}).fetch();
        if(qr.length > 0) {
          QrCode.remove({_id:qr[0]._id});
          var my_points = Meteor.user().points;
          Meteor.users.update({_id:Meteor.user()._id}, { $set: { points:my_points + 5 } });
          return "Success"
        } else {
          return "Invalid Code";
        }
      }
    }
	});

  Meteor.startup(function() {
      Meteor.setInterval(function() {
        var time = Math.round(new Date().getTime() / 1000);
        var qr = QrCode.remove({Expiration:{$lte:time}});
      }, 1000);
  });

}
