/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

/**
 * Enum representing all media actions.
 * @enum
 */
var mediaActions = {
  "CHANGED_RESOLUTION": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedResolution",
  "CHANGED_SIZE": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedSize",
  "CHANGED_SPEED": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedSpeed",
  "CHANGED_VOLUME": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedVolume",
  "CLOSED_POPOUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#ClosedPopout",
  "DISABLED_CLOSED_CAPTIONING": "http://purl.imsglobal.org/vocab/caliper/v1/action#DisabledCloseCaptioning",
  "ENABLED_CLOSE_CAPTIONING": "http://purl.imsglobal.org/vocab/caliper/v1/action#EnabledCloseCaptioning",
  "ENDED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Ended",
  "ENTERED_FULLSCREEN": "http://purl.imsglobal.org/vocab/caliper/v1/action#EnteredFullScreen",
  "EXITED_FULLSCREEN": "http://purl.imsglobal.org/vocab/caliper/v1/action#ExitedFullScreen",
  "FORWARDED_TO": "http://purl.imsglobal.org/vocab/caliper/v1/action#ForwardedTo",
  "JUMPED_TO": "http://purl.imsglobal.org/vocab/caliper/v1/action#JumpedTo",
  "MUTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Muted",
  "OPENED_POPOUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#OpenedPopout",
  "PAUSED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Paused",
  "RESUMED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Resumed",
  "REWOUND": "http://purl.imsglobal.org/vocab/caliper/v1/action#Rewound",
  "STARTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Started",
  "UNMUTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Unmuted",
};

module.exports = mediaActions;