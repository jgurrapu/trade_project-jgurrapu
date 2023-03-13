const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');


const category = ['Desktop', 'Accessories'];

const tradesList = [
    {
        id: '1',
        title: 'Full Setup',
        model: 'Optiplex 7000',
        details: 'OptiPlex was the product to be made with recycled plastic in 2007 and the first to use materials from a closed-loop supply chain in 2014. Today, OptiPlex contains up to 60% recycled material, meets Energy Star 8.0 specifications, and has more than 60 EPEAT-registered products and 50 TCO 8 Certified configurations.',
        img_url: '/images/fullsetup.jpg',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Desktop'
    },
    {
        id: '2',
        title: 'Laptop',
        model: 'ABS 5166',
        details: 'Extremely impressive mobile workstation with Gen i7 12700H CPU.Top of the line single and multi-threaded performance make the MW1000 ideal for light to heavy 3D CAD and trading workloads',
        img_url: '/images/laptop.jpg',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Desktop'
    },
    {
        id: '3',
        title: 'Chromebook',
        model: 'Flip C436',
        details: 'ASUS Chromebook Enterprise devices combine the end-user beneﬁts of Chromebooks with the business capabilities of ChromeOS for IT to secure, orchestrate and power the cloud workforce, and for further empowering your enterprise.',
        img_url: '/images/chrbk.png',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Desktop'
    },
    {
        id: '4',
        title: 'RAM',
        model: 'SM-0109',
        details: 'Delivers up to a 4.7 % improvement in latency at DDR4-2666 MT/ s in comparison to DDR4 2400 MT/s memory modules.',
        img_url: '/images/ram.jpg',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Accessories'
    },
    {
        id: '5',
        title: 'SSD',
        model: 'ST2000DM008',
        details: 'Versatile HDDs for all your PC needs bring you industry-leading excellence in personal computing Capacities up to 8TB for desktop Advanced Power modes help save energy without sacrificing performanceSATA 6Gb/s interface optimizes burst performance; 256MB Cache7200 RPM',
        img_url: '/images/ssd.jpg',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Accessories'
    },
    {
        id: '6',
        title: 'Motherboard',
        model: 'FS - 45066761',
        details: 'This Assy, Motherboard 512MB, FS is suitable for EFI VUTEk QS series, PressVu 320/400 & UltraVu II printers. This is the original EFI VUTEk part (number 45066761). This kit includes the motherboard with 512MB memory and a P4 processor.',
        img_url: '/images/motherb.jpeg',
        timestamp: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
        category: 'Accessories'
    },
];

exports.category = () => category;


exports.find = () => tradesList;


exports.findById = id => tradesList.find(item => item.id === id);

exports.save = function(trade) {
    trade.id = uuidv4();
    trade.timestamp = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    if (!category.includes(trade.category)) {
      category.push(trade.category);
    }
    tradesList.push(trade);
  };
  
exports.updateById = function (id, newTrade) {
    let trade = tradesList.find(trade => trade.id === id);
    if (!trade) {
        return false;
    }
    
    if (!category.includes(newTrade.category)) {
        category.push(newTrade.category);
    }
    
    trade.category = newTrade.category;
    trade.title = newTrade.title;
    trade.model = newTrade.model;
    trade.details = newTrade.details;
    trade.img_url = newTrade.img_url;

    category = category.filter(category => tradesList.some(trade => trade.category === category));
    
    console.log("Updated");
    return true;
};

exports.deleteById = function (id) {
    const index = tradesList.findIndex(trade => trade.id === id);
    if (index !== -1) {
      const deletedTrade = tradesList.splice(index, 1)[0];
      const categoryIndex = category.indexOf(deletedTrade.category);
      if (categoryIndex !== -1 && !tradesList.some(trade => trade.category === deletedTrade.category)) {
        category.splice(categoryIndex, 1);
      }
      console.log("Deleted");
      return true;
    } else {
      return false;
    }
  };
  