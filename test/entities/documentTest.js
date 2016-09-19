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

var moment = require('moment');
var test = require('tape');

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');

var jsonCompare = require('../testUtils');

test('Create a Document entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_EDU_IRI = "https://example.edu";
  const BASE_COM_IRI = "https://example.com";

  var creators = [];
  creators.push(entityFactory().create(Person, BASE_EDU_IRI.concat("/people/12345")));
  creators.push(entityFactory().create(Person, BASE_COM_IRI.concat("/staff/56789")));

  var document = entityFactory().create(Document, BASE_EDU_IRI.concat("/etexts/201.epub"), {
    name: "IMS Caliper Implementation Guide",
    creators: creators,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    datePublished: moment.utc("2016-10-01T06:00:00.000Z"),
    version: "1.1"
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityDocument', document, t);
});