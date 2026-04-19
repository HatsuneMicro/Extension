export const DEFAULT_RULES = [
  { id: 'utm',        pattern: 'utm_',            type: 'prefix', priority: 10 }, // Google Analytics
  { id: 'fbclid',     pattern: 'fbclid',          type: 'exact',  priority: 10 }, // Facebook
  { id: 'gclid',      pattern: 'gclid',           type: 'exact',  priority: 10 }, // Google Ads
  { id: 'msclkid',    pattern: 'msclkid',         type: 'exact',  priority: 10 }, // Microsoft Ads
  { id: 'mc_eid',     pattern: 'mc_eid',          type: 'exact',  priority: 10 }, // Mailchimp
  { id: 'igshid',     pattern: 'igshid',          type: 'exact',  priority: 10 }, // Instagram
  { id: 'yclid',      pattern: 'yclid',           type: 'exact',  priority: 10 }, // Yandex Click ID
  { id: 'ymclid',     pattern: 'ymclid',          type: 'exact',  priority: 10 }, // Yandex Market
  { id: 'ysclid',     pattern: 'ysclid',          type: 'exact',  priority: 10 }, // Yandex Search
  { id: 'ttclid',     pattern: 'ttclid',          type: 'exact',  priority: 10 }, // TikTok
  { id: 'twclid',     pattern: 'twclid',          type: 'exact',  priority: 10 }, // Twitter / X
  { id: 'li_fat_id',  pattern: 'li_fat_id',       type: 'exact',  priority: 10 }, // LinkedIn
  { id: '_epik',      pattern: '_epik',           type: 'exact',  priority: 10 }, // Pinterest
  { id: 'scid',       pattern: 'scid',            type: 'exact',  priority: 10 }, // Snapchat
  { id: 'dclid',      pattern: 'dclid',           type: 'exact',  priority: 10 }, // DoubleClick
  { id: 'irclickid',  pattern: 'irclickid',       type: 'exact',  priority: 10 }, // Impact Radius
  { id: 's_kwcid',    pattern: 's_kwcid',         type: 'exact',  priority: 10 }, // Adobe Analytics
  { id: '_hsenc',     pattern: '_hsenc',          type: 'exact',  priority: 10 }, // HubSpot
  { id: '_hsmi',      pattern: '_hsmi',           type: 'exact',  priority: 10 }, // HubSpot
  { id: 'mc_cid',     pattern: 'mc_cid',          type: 'exact',  priority: 10 }, // Mailchimp
  { id: '_kx',        pattern: '_kx',             type: 'exact',  priority: 10 }, // Klaviyo
  { id: 'mkt_tok',    pattern: 'mkt_tok',         type: 'exact',  priority: 10 }, // Marketo
  { id: 'pk_campaign',pattern: 'pk_campaign',     type: 'exact',  priority: 10 }, // Matomo / Piwik
  { id: 'pk_kwd',     pattern: 'pk_kwd',          type: 'exact',  priority: 10 }, // Matomo / Piwik
  { id: 'spm',        pattern: 'spm',             type: 'exact',  priority: 10 }, // Alibaba / AliExpress
  { id: 'gclsrc',     pattern: 'gclsrc',          type: 'exact',  priority: 10 }, // Google Ads
  { id: 'hsa_',       pattern: 'hsa_',            type: 'prefix', priority: 10 }, // HubSpot Ads
  { id: 'rb_clickid', pattern: 'rb_clickid',      type: 'exact',  priority: 10 }, // Retention Science
  { id: 'wickedid',   pattern: 'wickedid',        type: 'exact',  priority: 10 }, // Wicked Reports
  { id: 'pi_email',   pattern: 'pi_email',        type: 'exact',  priority: 10 }, // Pardot
  { id: 'cmpid',      pattern: 'cmpid',           type: 'exact',  priority: 10 }, // Adobe / Generic
  { id: 'hop',        pattern: 'hop',             type: 'exact',  priority: 10 }, // ClickBank
  { id: 'ranMID',     pattern: 'ranMID',          type: 'exact',  priority: 10 }, // Rakuten
  { id: 'ranEAID',    pattern: 'ranEAID',         type: 'exact',  priority: 10 }, // Rakuten
  { id: 'ranSiteID',  pattern: 'ranSiteID',       type: 'exact',  priority: 10 }, // Rakuten
  { id: 'sscid',      pattern: 'sscid',           type: 'exact',  priority: 10 }, // ShareASale
  { id: 'ml_subscriber_id', pattern: 'ml_subscriber_id', type: 'exact', priority: 10 } // MailerLite
];
