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

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

// Request
var requestor = require('../src/request/httpRequestor');

// Event
var Event = require('../src/events/navigationEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Actions
var NavigationActions = require('../src/actions/navigationActions');

// Activity Context
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Frame = require('../src/entities/reading/frame');
var WebPage = require('../src/entities/reading/webPage');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require ('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var Session = require('../src/entities/session/session');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Envelope containing a single Navigation Event and validate attributes', function (t) {

    // Plan for N assertions
    t.plan(1);

    // The Actor for the Caliper Event
    var actor = new Person("https://example.edu/user/554433");
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // Federated Session
    var session = new Session("https://example.edu/lms/federatedSession/123456789");
    session.setActor(actor);
    session.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    session.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    session.setEndedAtTime(null);
    session.setDuration(null);

    // The Action for the Caliper Event
    var action = NavigationActions.NAVIGATED_TO;

    // The Object being interacted with by the Actor
    var eventObj = new EPubVolume("https://example.com/viewer/book/34843#epubcfi(/4/3)");
    eventObj.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
    eventObj.setVersion("2nd ed.");
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The target object (frame) within the Event Object
    var target = new Frame("https://example.com/viewer/book/34843#epubcfi(/4/3/1)");
    target.setName("Key Figures: George Washington");
    target.setIsPartOf(eventObj)
    target.setVersion(eventObj.version);
    target.setIndex(1);
    target.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    target.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // Specific to the Navigation Event - the location where the user navigated from
    var navigatedFrom = new WebPage("https://example.edu/politicalScience/2015/american-revolution-101/index.html");
    navigatedFrom.setName("American Revolution 101 Landing Page");
    navigatedFrom.setVersion("1.0");
    navigatedFrom.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    navigatedFrom.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://example.com/viewer");
    edApp.setName("ePub");
    edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    edApp.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://example.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://example.edu/politicalScience/2015/american-revolution-101/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Group
    var group = new Group("https://example.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // The Actor's Membership
    var membership = new Membership("https://example.edu/politicalScience/2015/american-revolution-101/roster/554433");
    membership.setName("American Revolution 101");
    membership.setDescription("Roster entry");
    membership.setMember(actor['@id']);
    membership.setOrganization(courseSection['@id']);
    membership.setRoles([Role.LEARNER]);
    membership.setStatus(Status.ACTIVE);
    membership.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // Assert that key attributes are the same
    var event = new Event();
    event.setActor(actor);
    event.setAction(action);
    event.setObject(eventObj);
    event.setTarget(target);
    event.setNavigatedFrom(navigatedFrom);
    event.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    event.setEdApp(edApp);
    event.setGroup(group);
    event.setMembership(membership);
    event.setFederatedSession(session['@id']);

    // Initialize faux sensor and default options
    var sensor = createFauxSensor("https://example.edu/sensor/001");
    var options = {};

    // Initialize requestor, create envelope and reset sendTime with fixture value (or test will fail).
    requestor.initialize(options);
    var payload = requestor.createEnvelope(sensor, event);
    payload.setSendTime((new Date("2015-09-15T11:05:01.000Z")).toISOString());

    console.log("Envelope payload = " + util.inspect(payload));

    // Assert that JSON produced is the same
    jsonCompare('eventStorePayload', payload, t);
});

/**
 * Create a fake sensor object in order to avoid generating a "window is not defined"
 * reference error since we are not running tests in the browser but on the server.
 * @param id
 * @returns {{id: *}}
 */
function createFauxSensor(id) {
    return {id: id};
}