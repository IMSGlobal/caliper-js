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

var _ = require('lodash');
var moment = require('moment');
var test = require('tape');

var config = require('../../src/config/config');
var eventFactory = require('../../src/events/eventFactory');
var ToolLaunchEvent = require('../../src/events/toolLaunchEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/agent/courseSection');
var Link = require('../../src/entities/resource/link');
var LtiLink = require('../../src/entities/resource/ltiLink');
var LtiSession = require('../../src/entities/session/ltiSession');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');

var Status = require('../../src/entities/agent/status');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEventToolLaunchReturned.json";

testUtils.readFile(path, function(err, fixture) {
    if (err) throw err;

    test('toolLaunchEventReturnedTest', function (t) {

        // Plan for N assertions
        t.plan(1);

        var BASE_EDU_IRI = "https://example.edu";
        var BASE_COM_IRI = "https://example.com";
        var BASE_SECTION_IRI = "https://example.edu/terms/201801/courses/7/sections/1";

        // Id with canned value
        uuid = "urn:uuid:a2e8b214-4d4a-4456-bb4c-099945749117";

        // The Actor
        var actor = entityFactory().create(Person, {id: BASE_EDU_IRI.concat("/users/554433")});

        // The Action
        var action = actions.returned.term;

        // The Object of the interaction
        var obj = entityFactory().create(SoftwareApplication, {id: BASE_COM_IRI.concat("/lti/tool")});

        // Event time
        var eventTime = moment.utc("2018-11-15T10:15:00.000Z");

        // edApp
        var edApp = entityFactory().create(SoftwareApplication, {id: BASE_EDU_IRI});

        // Referrer
        var referrer = entityFactory().create(LtiLink, {id: "https://tool.com/lti/123"});

        // Target
        var target = entityFactory().create(Link, {
            id: BASE_SECTION_IRI.concat("/pages/1"),
        });

        // Group
        var group = entityFactory().create(CourseSection, {
            id: BASE_SECTION_IRI,
            courseNumber: "CPS 435-01",
            academicSession: "Fall 2018"
        });

        // The Actor's Membership
        var membership = entityFactory().create(Membership, {
            id: BASE_SECTION_IRI.concat("/rosters/1"),
            member: actor.id,
            organization: group.id,
            roles: [Role.learner.term],
            status: Status.active.term,
            dateCreated: moment.utc("2018-08-01T06:00:00.000Z")
        });

        // Session
        var session = entityFactory().create(Session, {
            id: BASE_EDU_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
            startedAtTime: moment.utc("2018-11-15T10:00:00.000Z")
        });

        // Federated Session
        var federatedSession = entityFactory().create(LtiSession, {
            id: "https://example.edu/lti/sessions/b533eb02823f31024e6b7f53436c42fb99b31241",
            user: actor,
            dateCreated: moment.utc("2018-11-15T10:15:00.000Z"),
            startedAtTime: moment.utc("2018-11-15T10:15:00.000Z")
        });

        // Assert that key attributes are the same
        var event = eventFactory().create(ToolLaunchEvent, {
            id: uuid,
            actor: actor,
            action: action,
            object: obj,
            eventTime: eventTime,
            edApp: edApp,
            referrer: referrer,
            target: target,
            group: group,
            membership: membership,
            session: session,
            federatedSession: federatedSession
        });

        // Compare
        var diff = testUtils.compare(fixture, clientUtils.parse(event));
        var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

        t.equal(true, _.isUndefined(diff), diffMsg);
        //t.end();
    });
});